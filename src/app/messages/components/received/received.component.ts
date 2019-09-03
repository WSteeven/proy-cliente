import { Component, OnInit, DoCheck} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Follow } from '../../../models/follow';
import { Message } from '../../../models/message';
import { User } from '../../../models/user';
import { MessageService } from '../../../services/message.service'
import { UserService } from '../../../services/user.service'
import { GLOBAL } from '../../../services/global';
import { FollowService } from '../../../services/follow.service';

@Component({
    selector: 'received',
    templateUrl: './received.component.html',
    providers: [FollowService, MessageService, UserService]
})

export class ReceivedComponent implements OnInit{
    public title: string;
    public identity;
    public token;
    public url: string;
    public status: string;
    public messages: Message[];
    public page;
    public total;
    public pages;
    public prev_page;
    public next_page;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _followService: FollowService,
        private _messageService: MessageService,
        private _userService: UserService
    ){
        this.title = 'Mensajes recibidos';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        // this.message = new Message('','','','',this.identity._id,'');
    }

    ngOnInit(){
        console.log('Received component cargado');
        this.actualPage();
    }

    actualPage(){
        this._route.params.subscribe(params => {

            let page = +params['page'];
            this.page = page;

            if(!params['page']){
                page = 1;
            }
            
            if(!page){
                page = 1;
            } else {
                this.next_page = page+1;
                this.prev_page = page-1;

                if(this.prev_page <= 0){
                    this.prev_page = 1;
                }
            }

            //devolver listado de usuarios
            this.getMessages(this.token, this.page);
        });
    }

    getMessages(token, page){
        this._messageService.getMyMessages(token, page).subscribe(
            response => {
                if(!response.messages){
                    
                }else{
                    this.messages = response.messages;
                    this.total = response.total;
                    this.pages = response.pages;
                }
            },
            error => {
                console.log(<any>error);
            }
        )
    }
}