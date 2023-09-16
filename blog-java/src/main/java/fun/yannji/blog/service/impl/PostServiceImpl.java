package fun.yannji.blog.service.impl;

import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import fun.yannji.blog.common.constants.CommonConstants;
import fun.yannji.blog.common.PageResult;
import fun.yannji.blog.common.enums.CodeEnum;
import fun.yannji.blog.common.exception.BizException;
import fun.yannji.blog.domain.dto.PostDTO;
import fun.yannji.blog.domain.dto.PostCategoryDTO;
import fun.yannji.blog.domain.dto.PostTagDTO;
import fun.yannji.blog.domain.vo.PostSaveVO;
import fun.yannji.blog.domain.vo.PostSearchVO;
import fun.yannji.blog.domain.vo.PostSettingVO;
import fun.yannji.blog.entity.Category;
import fun.yannji.blog.entity.Post;
import fun.yannji.blog.entity.Tag;
import fun.yannji.blog.mapper.CategoryMapper;
import fun.yannji.blog.mapper.PostMapper;
import fun.yannji.blog.mapper.TagMapper;
import fun.yannji.blog.service.PostService;
import fun.yannji.blog.util.PageUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

/**
 * @author yuandi
 * @email adashhawk@163.com
 * @createtime 2023/3/22 13:04
 */

@Service
public class PostServiceImpl
        extends ServiceImpl<PostMapper, Post>
        implements PostService {

    @Autowired
    private TagMapper tagMapper;
    @Autowired
    private CategoryMapper categoryMapper;

    @Override
    public PageResult listPost(PostSearchVO vo, boolean isAdmin) {
        Page<Post> page = (Page<Post>)PageUtil.getPage();
        LambdaQueryWrapper<Post> condition = new LambdaQueryWrapper<>();
        if (ObjectUtil.isNotNull(vo)) {
            if (StrUtil.isNotBlank(vo.getTitle())) {
                condition.like(Post::getTitle, vo.getTitle());
            }
            if (ObjectUtil.isNotNull(vo.getIsPublish())) {
                condition.eq(Post::getIsPublish,vo.getIsPublish());
            }
            if (ObjectUtil.isNotNull(vo.getIsDisplay())) {
                condition.eq(Post::getIsDisplay,vo.getIsDisplay());
            }
            if (ObjectUtil.isNotNull(vo.getIsTop())) {
                condition.eq(Post::getIsTop,vo.getIsTop());
            }
        }
        if (!isAdmin) {
            condition.eq(Post::getIsDisplay,1)
                    .eq(Post::getIsPublish,1);
        }
        condition.orderByDesc(Post::getIsTop);
        condition.orderByDesc(Post::getCreateTime);
        this.page(page,condition);

        List<Post> posts = page.getRecords();
        if (posts.isEmpty()) {
            return PageResult.buildPageResult();
        }
        List<PostDTO> res = buildPostsInfo(posts);
        return PageResult.buildPageResult(page,res);
    }

    private List<PostDTO> buildPostsInfo(List<Post> posts) {

        Set<String> postIds = posts.stream().map(item -> item.getId()).collect(Collectors.toSet());
        List<PostTagDTO> tags = tagMapper.listTagByPostIds(postIds,true);
        List<PostCategoryDTO> categorys = categoryMapper.listCategoryByPostIds(postIds, true);

        List<PostDTO> res = new ArrayList<>(20);
        Map<String, List<PostTagDTO>> tagsMap = tags.stream().collect(Collectors.groupingBy(PostTagDTO::getPostId));
        Map<String, List<PostCategoryDTO>> categorysMap = categorys.stream().collect(Collectors.groupingBy(PostCategoryDTO::getPostId));

        posts.forEach(item -> {
            String postId = item.getId();
            String mdContent = item.getMdContent();
            if (StrUtil.length(mdContent) > 500) {
                String c = mdContent.substring(0, 500);
                item.setMdContent(c);
            }
            PostDTO dto = PostDTO.builder()
                    .post(item)
                    .tags(tagsMap.getOrDefault(postId,Collections.EMPTY_LIST))
                    .categorys(categorysMap.getOrDefault(postId,Collections.EMPTY_LIST))
                    .build();
            res.add(dto);
        });

        return res;
    }

    @Override
    public String savePost(PostSaveVO vo) {
        String id = vo.getId();
        if(StrUtil.isBlank(vo.getTitle())) {
            vo.setTitle(CommonConstants.POST_DEFAULT_TITLE);
        }
        if (StrUtil.isBlank(vo.getMdContent())) {
            vo.setMdContent("");
        }
        if (StrUtil.isBlank(id)) { // 是第一次保存
            Post post = Post.builder()
                    .title(vo.getTitle())
                    .coverImg(CommonConstants.POST_DEFAULT_COVER_IMG)
                    .mdContent(vo.getMdContent())
                    .isPublish(0)
                    .isDisplay(1)
                    .isTop(0).build();
            this.save(post);
            return post.getId();
        } else {
            Post post = this.getById(id);
            if (ObjectUtil.isNull(post)) {
                throw new BizException(CodeEnum.NOT_FOUND);
            }
            this.lambdaUpdate()
                    .set(Post::getTitle,vo.getTitle())
                    .set(Post::getMdContent,vo.getMdContent())
                    .eq(Post::getId,id)
                    .update();
            return id;
        }
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void settingPost(PostSettingVO vo) {
        Post post = new Post();
        BeanUtils.copyProperties(vo,post);
        String postId = post.getId();
        if (StrUtil.isBlank(postId)) {
            throw new BizException(CodeEnum.NOT_FOUND);
        }
        this.updateById(post);
        List<String> addTagIds = vo.getAddTagIds();
        List<String> delTagIds = vo.getDelTagIds();
        List<String> addCategoryIds = vo.getAddCategoryIds();
        List<String> delCategoryIds = vo.getDelCategoryIds();
        if (!addTagIds.isEmpty()) {
            this.baseMapper.saveTagsToPost(addTagIds,postId);
        }
        if (!delTagIds.isEmpty()) {
            this.baseMapper.removeTagsFromPost(delTagIds,postId);
        }
        if (!addCategoryIds.isEmpty()) {
            this.baseMapper.saveCategorysToPost(addCategoryIds,postId);
        }
        if (!delCategoryIds.isEmpty()) {
            this.baseMapper.removeCategorysFromPost(delCategoryIds,postId);
        }
    }

    @Override
    public PostDTO getPostInfo(String id, boolean isAdmin) {

        if (StrUtil.isBlank(id)) {
            throw new BizException(CodeEnum.PARAMETER_ERROR);
        }
        PostDTO res = new PostDTO();

        LambdaQueryWrapper<Post> condition = new LambdaQueryWrapper<>();
        condition.eq(Post::getId,id);
        if (!isAdmin) {
            condition.eq(Post::getIsDisplay,1)
                    .eq(Post::getIsPublish,1);
        }
        Post dbPost = this.getOne(condition);
        res.setPost(dbPost);
        if (ObjectUtil.isNull(dbPost)) {
            return res;
        }

        List<PostTagDTO> tags = tagMapper.listTagByPostIds(Collections.singleton(id),isAdmin);
        res.setTags(tags);
        List<PostCategoryDTO> categorys = categoryMapper.listCategoryByPostIds(Collections.singleton(id), isAdmin);
        res.setCategorys(categorys);

        return res;
    }

    @Override
    public PageResult listPostByTagId(String tagId, boolean isAdmin) {
        Page<?> page = PageUtil.getPage();
        Tag tag = tagMapper.selectById(tagId);

        // 标签不存在 或者 依据标签查询前台的文章但是标签为隐藏状态  ->  返回空数据
        if (ObjectUtil.isNull(tag) || (!isAdmin && tag.getIsDisplay() == 0) ) {
            return PageResult.buildPageResult();
        }
        // 查询文章数量
        Long count = this.baseMapper.selectCountByTagId(tagId, isAdmin);
        if (count != null && count == 0) {
            return PageResult.buildPageResult();
        }
        // 分页查询文章
        List<Post> posts = this.baseMapper.pagePostByTagId(tagId,isAdmin,PageUtil.getLimitCurrent(), page.getSize());
        // 构造文章相关数据
        List<PostDTO> res = buildPostsInfo(posts);

        return PageResult.builder()
                .current(page.getCurrent())
                .size(page.getSize())
                .total(count)
                .list(res)
                .build();
    }

    @Override
    public PageResult listPostByCategoryId(String categoryId, boolean isAdmin) {
        Page<?> page = PageUtil.getPage();
        Category category = categoryMapper.selectById(categoryId);

        // 分类不存在 或者 依据分类查询前台的文章但是分类为隐藏状态  ->  返回空数据
        if (ObjectUtil.isNull(category) || (!isAdmin && category.getIsDisplay() == 0) ) {
            return PageResult.buildPageResult();
        }

        // 查询文章数量
        Long count = this.baseMapper.selectCountByCategoryId(categoryId, isAdmin);
        if (count != null && count == 0) {
            return PageResult.buildPageResult();
        }
        // 分页查询文章
        List<Post> posts = this.baseMapper.pagePostByCategoryId(categoryId,isAdmin,PageUtil.getLimitCurrent(), page.getSize());
        // 构造文章相关数据
        List<PostDTO> res = buildPostsInfo(posts);

        return PageResult.builder()
                .current(page.getCurrent())
                .size(page.getSize())
                .total(count)
                .list(res)
                .build();
    }

    @Override
    public PageResult listArchivePost(boolean isAdmin) {
        Page<Post> page = (Page<Post>)PageUtil.getPage();
        LambdaQueryWrapper<Post> condition = new LambdaQueryWrapper<>();
        if (!isAdmin) {
            condition.eq(Post::getIsDisplay,1)
                    .eq(Post::getIsPublish,1);
        }
        condition.orderByDesc(Post::getPublishTime);
        this.page(page,condition);
        List<Post> posts = page.getRecords();
        if (posts.isEmpty()) {
            return PageResult.buildPageResult();
        }
        List<PostDTO> res = buildPostsInfo(posts);
        return PageResult.buildPageResult(page,res);

    }


}
