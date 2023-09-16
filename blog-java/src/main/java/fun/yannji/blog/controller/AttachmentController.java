package fun.yannji.blog.controller;

import fun.yannji.blog.common.PageResult;
import fun.yannji.blog.common.Response;
import fun.yannji.blog.domain.vo.AttachmentDeleteVO;
import fun.yannji.blog.domain.vo.AttachmentSearchVO;
import fun.yannji.blog.domain.vo.AttachmentUploadVO;
import fun.yannji.blog.entity.Attachment;
import fun.yannji.blog.service.AttachmentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/3/26 11:27
 */

@RestController
@Api(tags = "附件模块")
public class AttachmentController {

    @Autowired
    private AttachmentService attachmentService;

    @GetMapping("/admin/attachment/list")
    @ApiOperation("分页查询附件")
    public Response pageAttachment(AttachmentSearchVO vo) {
        PageResult pageResult = attachmentService.pageAttachment(vo);
        return Response.ok(pageResult);
    }

    @PostMapping("/admin/attachment/upload")
    @ApiOperation("上传附件")
    public Response uploadAttachment(@RequestPart("attachment") MultipartFile attachment, AttachmentUploadVO vo) {
        String link = attachmentService.uploadAttachment(attachment,vo);
        return Response.ok(link);
    }

    @PutMapping("/admin/attachment")
    @ApiOperation("修改附件信息")
    public Response updateAttachment(@RequestBody Attachment attachment) {
        attachmentService.updateAttachment(attachment);
        return Response.ok();
    }

    @DeleteMapping("/admin/attachment/{id}")
    @ApiOperation("根据ID删除单个附件")
    public Response removeById(@PathVariable String id) {
        attachmentService.removeById(id);
        return Response.ok();
    }

    @DeleteMapping("/admin/attachment")
    @ApiOperation("根据ID批量删除附件")
    public Response removeBatch(@RequestBody AttachmentDeleteVO vo) {
        attachmentService.removeBatchByIds(vo.getDelIds());
        return Response.ok();
    }
}
