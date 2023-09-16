package fun.yannji.blog.service;

import com.baomidou.mybatisplus.extension.service.IService;
import fun.yannji.blog.common.PageResult;
import fun.yannji.blog.domain.dto.PostDTO;
import fun.yannji.blog.domain.vo.PostSaveVO;
import fun.yannji.blog.domain.vo.PostSearchVO;
import fun.yannji.blog.domain.vo.PostSettingVO;
import fun.yannji.blog.entity.Post;

/**
 * @author yuandi
 * @email adashhawk@163.com
 * @createtime 2023/3/22 13:03
 */
public interface PostService extends IService<Post> {

    PageResult listPost(PostSearchVO vo, boolean isAdmin);

    String savePost(PostSaveVO vo);

    void settingPost(PostSettingVO vo);

    PostDTO getPostInfo(String id, boolean isAdmin);

    PageResult listPostByTagId(String tagId, boolean isAdmin);

    PageResult listPostByCategoryId(String categoryId, boolean isAdmin);

    PageResult listArchivePost(boolean isAdmin);
}
