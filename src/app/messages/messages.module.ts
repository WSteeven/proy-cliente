//modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';

//rutas
import { MessagesRoutingModule} from './messages-routing.module';

//componentes
import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { ReceivedComponent } from './components/received/received.component';
import { SendedComponent } from './components/sended/sended.component';

//servicios
import { UserService } from '../services/user.service';
import { UserGuard } from '../services/user.guard';

@NgModule({
    declarations: [
        MainComponent,
        AddComponent,
        ReceivedComponent,
        SendedComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MomentModule,
        MessagesRoutingModule,
    ],
    exports: [
        MainComponent,
        AddComponent,
        ReceivedComponent,
        SendedComponent
    ],
    providers: [
        UserService,
        UserGuard
    ]
})

export class MessagesModule {
    
}
