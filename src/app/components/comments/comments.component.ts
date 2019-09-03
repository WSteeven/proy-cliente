import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service'
import { GLOBAL } from '../../services/global'
import { Publication } from '../../models/publication';
import { PublicationService } from '../../services/publication.service';
import { UploadService } from '../../services/upload.service';
import { Comment } from '../../models/comment';
import { CommentService } from 'src/app/services/comment.service';

@Component({
    selector: 'comment',
    templateUrl: './comments.component.html',
    providers: [UserService, CommentService, UploadService]
})

export class CommentComponent implements OnInit {
    public identity;
    public token;
    public url;
    public status;
    public publication: Publication;
    public comment: Comment;

    constructor(
        private _userService: UserService,
        private _publicationService: PublicationService,
        private _commentService: CommentService,
        private _uploadService: UploadService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.publication = new Publication('', '', '', '', this.identity._id); // Creo que esta linea no va
        this.comment = new Comment('', '', '', '', this.identity._id, this.publication._id); // conf de mi comentario
    }

    ngOnInit() {
        console.log('Comment cargado');
    }
    onSubmit(form, $event) {
        this._commentService.addComment(this.token, this.comment).subscribe(
            response => {
                if (response.comment) {
                    console.log('Paso por aqui el comentario');
                    if (this.filesToUpload && this.filesToUpload.length) {
                        // subir imagen
                        this._uploadService.makeFileRequest(this.url + 'upload-image-comment/' + response.publication._id,
                            [], this.filesToUpload, this.token, 'image').then((result: any) => {
                                this.status = 'success';
                                this.comment.file = result.image;
                                form.reset();
                                this._router.navigate(['/timeline']);
                            });
                    } else {
                        this.status = 'success';
                        form.reset();
                        this._router.navigate(['/timeline']);
                    }
                } else {
                    this.status = 'error';
                }
            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);
                if (errorMessage != null) {
                    this.status = 'error';
                }
            }
        );
    }

    public filesToUpload: Array<File>;
    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }

}



