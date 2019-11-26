import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './appRouting.module';
import {HttpClientModule} from '@angular/common/http';
import {NgxImgModule} from 'ngx-img';
import {AgmCoreModule} from '@agm/core';

import {AppComponent} from './app.component';
import {LogInComponent} from './layout/log-in/log-in.component';
import {AdministratorComponent} from './administrator/administrator.component';
import {ModeratorComponent} from './moderator/moderator.component';
import {NotFoundComponent} from './layout/exceptions/not-found/not-found.component';
import {ModeratorListComponent} from './administrator/moderators/moderator-list/moderator-list.component';
import {CreateNewsComponent} from './administrator/news/create-news/create-news.component';
import {NotPublishedNewsComponent} from './administrator/news/not-published-news/not-published-news.component';
import {NotPublishedNewsItemComponent} from './administrator/news/not-published-news/not-published-news-item/not-published-news-item.component';
import {PublishedNewsItemComponent} from './administrator/news/published-news/published-news-item/published-news-item.component';
import {PublishedNewsComponent} from './administrator/news/published-news/published-news.component';
import {CreateModeratorComponent} from './administrator/moderators/create-moderator/create-moderator.component';
import {ModeratorItemComponent} from './administrator/moderators/moderator-list/moderator-item/moderator-item.component';
import {ModeratorDetailComponent} from './administrator/moderators/moderator-detail/moderator-detail.component';
import {MyNewsComponent} from './administrator/news/my-news/my-news.component';
import {LayoutComponent} from './layout/layout.component';
import {SignInModalComponent} from './layout/sign-in-modal/sign-in-modal.component';
import {ForbiddenComponent} from './layout/exceptions/forbidden/forbidden.component';
import {NewsByTypeComponent} from './layout/news/news-by-type/news-by-type.component';
import {NewsComponent} from './layout/news/news.component';
import {NewsDetailComponent} from './layout/news/news-detail/news-detail.component';
import {NewsItemComponent} from './layout/news/news-item/news-item.component';
import {EditNewsComponent} from './administrator/news/edit-news/edit-news.component';
import {MyProfileComponent} from './layout/my-profile/my-profile.component';
import {MrnewsItemComponent} from './layout/news/mrnews-item/mrnews-item.component';
import {MainSidebarComponent} from './layout/main-sidebar/main-sidebar.component';
import {AllNewsComponent} from './administrator/news/all-news/all-news.component';
import {TranslateNewsComponent} from './administrator/news/translate-news/translate-news.component';
import {ContactComponent} from './layout/contact/contact.component';
import {AdminNavPanelComponent} from './administrator/admin-nav-panel/admin-nav-panel.component';
import {AdminDashboardComponent} from './administrator/admin-dashboard/admin-dashboard.component';
import {AdminLogComponent} from './administrator/admin-log/admin-log.component';
import {AdminModeratorComponent} from './administrator/admin-moderator/admin-moderator.component';
import {AdminCommentComponent} from './administrator/admin-comment/admin-comment.component';
import {AdminUserComponent} from './administrator/admin-user/admin-user.component';
import {ConfirmModalComponent} from './shared/confirm-modal/confirm-modal.component';
import {AdminModeratorItemComponent} from './administrator/admin-moderator/admin-moderator-item/admin-moderator-item.component';
import {SharedToasterComponent} from './shared/shared-toaster/shared-toaster.component';
import {SharedToasterItemComponent} from './shared/shared-toaster/shared-toaster-item/shared-toaster-item.component';
import {AdminNewsListComponent} from './administrator/adm-news/admin-news-list/admin-news-list.component';
import { AdminNewsCreateComponent } from './administrator/adm-news/admin-news-create/admin-news-create.component';
import { AdminNewsNotPubComponent } from './administrator/adm-news/admin-news-not-pub/admin-news-not-pub.component';
import { InteractiveComponent } from './layout/interactive/interactive.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    AdministratorComponent,
    ModeratorComponent,
    NotFoundComponent,
    ModeratorListComponent,
    CreateNewsComponent,
    NotPublishedNewsComponent,
    NotPublishedNewsItemComponent,
    PublishedNewsItemComponent,
    PublishedNewsComponent,
    CreateModeratorComponent,
    ModeratorItemComponent,
    ModeratorDetailComponent,
    MyNewsComponent,
    LayoutComponent,
    SignInModalComponent,
    ForbiddenComponent,
    NewsByTypeComponent,
    NewsComponent,
    NewsDetailComponent,
    NewsItemComponent,
    EditNewsComponent,
    MyProfileComponent,
    MrnewsItemComponent,
    MainSidebarComponent,
    AllNewsComponent,
    TranslateNewsComponent,
    ContactComponent,
    AdminNavPanelComponent,
    AdminDashboardComponent,
    AdminLogComponent,
    AdminModeratorComponent,
    AdminCommentComponent,
    AdminUserComponent,
    ConfirmModalComponent,
    AdminModeratorItemComponent,
    SharedToasterComponent,
    SharedToasterItemComponent,
    AdminNewsListComponent,
    AdminNewsCreateComponent,
    AdminNewsNotPubComponent,
    InteractiveComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyBDaNo28mD5SXWHDdlmeEUdNDTbyqmNc7Q'}),
    NgxImgModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
