import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from './services/authGuard';
import {AdminGuard} from './services/adminGuard';
import {ModeratorGuard} from './services/moderatorGuard';
import {LocalStorageSecurity} from './util/localStorageSecurity';
import {CommonKey} from './util/commonKey';

import {AppComponent} from './app.component';
import {LogInComponent} from './layout/log-in/log-in.component';
import {NotFoundComponent} from './layout/exceptions/not-found/not-found.component';
import {ForbiddenComponent} from './layout/exceptions/forbidden/forbidden.component';
import {LayoutComponent} from './layout/layout.component';
import {NewsByTypeComponent} from './layout/news/news-by-type/news-by-type.component';
import {NewsComponent} from './layout/news/news.component';
import {NewsDetailComponent} from './layout/news/news-detail/news-detail.component';

import {AdministratorComponent} from './administrator/administrator.component';
import {CreateModeratorComponent} from './administrator/moderators/create-moderator/create-moderator.component';
import {ModeratorListComponent} from './administrator/moderators/moderator-list/moderator-list.component';
import {CreateNewsComponent} from './administrator/news/create-news/create-news.component';
import {NotPublishedNewsComponent} from './administrator/news/not-published-news/not-published-news.component';
import {PublishedNewsComponent} from './administrator/news/published-news/published-news.component';
import {MyNewsComponent} from './administrator/news/my-news/my-news.component';

import {ModeratorComponent} from './moderator/moderator.component';
import {ModeratorDetailComponent} from './administrator/moderators/moderator-detail/moderator-detail.component';
import {MyProfileComponent} from './layout/my-profile/my-profile.component';
import {AllNewsComponent} from './administrator/news/all-news/all-news.component';
import {TranslateNewsComponent} from './administrator/news/translate-news/translate-news.component';
import {ContactComponent} from './layout/contact/contact.component';
import { InteractiveComponent } from './layout/interactive/interactive.component';
import {AdminDashboardComponent} from "./administrator/admin-dashboard/admin-dashboard.component";
import {AdminCommentComponent} from "./administrator/admin-comment/admin-comment.component";
import {AdminModeratorComponent} from "./administrator/admin-moderator/admin-moderator.component";
import {AdminNavPanelComponent} from "./administrator/admin-nav-panel/admin-nav-panel.component";
import {AdminUserComponent} from "./administrator/admin-user/admin-user.component";
import {AdminLogComponent} from "./administrator/admin-log/admin-log.component";
import {AdminNewsListComponent} from "./administrator/adm-news/admin-news-list/admin-news-list.component";
import {AdminNewsCreateComponent} from "./administrator/adm-news/admin-news-create/admin-news-create.component";
import {AdminNewsNotPubComponent} from "./administrator/adm-news/admin-news-not-pub/admin-news-not-pub.component";

const appRoutes: Routes = [
  {
    path: '', children: [
    {path: '', redirectTo: 'uzl', pathMatch: 'full'},
    {
      path: 'uzl', component: LayoutComponent, children: [
      {path: '', component: NewsComponent, runGuardsAndResolvers: 'always'},
      {path: 'my-profile', component: MyProfileComponent, canActivate: [AuthGuard]},
      {path: 'topic/:type', component: NewsByTypeComponent},
      {path: 'news/:id', component: NewsDetailComponent},
      {path: 'contact', component: ContactComponent},
      {path: 'interactives', component: InteractiveComponent}
    ]
    },
    {
      path: 'uzk', component: LayoutComponent, children: [
      {path: '', component: NewsComponent},
      {path: 'my-profile', component: MyProfileComponent, canActivate: [AuthGuard]},
      {path: 'topic/:type', component: NewsByTypeComponent},
      {path: 'news/:id', component: NewsDetailComponent},
      {path: 'contact', component: ContactComponent},
      {path: 'interactives', component: InteractiveComponent}
    ]
    },
    {
      path: 'ru', component: LayoutComponent, children: [
      {path: '', component: NewsComponent},
      {path: 'my-profile', component: MyProfileComponent, canActivate: [AuthGuard]},
      {path: 'topic/:type', component: NewsByTypeComponent},
      {path: 'news/:id', component: NewsDetailComponent},
      {path: 'contact', component: ContactComponent},
      {path: 'interactives', component: InteractiveComponent}
    ]
    },
    {
      path: 'en', component: LayoutComponent, children: [
      {path: '', component: NewsComponent},
      {path: 'my-profile', component: MyProfileComponent, canActivate: [AuthGuard]},
      {path: 'topic/:type', component: NewsByTypeComponent},
      {path: 'news/:id', component: NewsDetailComponent},
      {path: 'contact', component: ContactComponent},
      {path: 'interactives', component: InteractiveComponent}
    ]
    }
  ]
  },
  {
    path: 'administrator', children: [
    {
      path: '', component: AdministratorComponent, canActivate: [AdminGuard],
      children: [
        {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
        {path: 'dashboard', component: AdminDashboardComponent},
        {path: 'moderator', component: AdminModeratorComponent},
        {path: 'comment', component: AdminCommentComponent},
        {path: 'user', component: AdminUserComponent},
        {path: 'log', component: AdminLogComponent},
        {path: 'news-list', component: AdminNewsListComponent},
        {path: 'news-create/:action', component: AdminNewsCreateComponent},
        {path: 'news-not', component: AdminNewsNotPubComponent},
        /*{
         path: 'moderators', children: [
         {path: '', component: ModeratorListComponent},
         {path: 'create-moderator', component: CreateModeratorComponent},
         {path: 'detail', component: ModeratorDetailComponent}
         ]
         },*/
        {path: 'create-news', component: CreateNewsComponent},
        {path: 'my-news', component: MyNewsComponent},
        {path: 'all-news', component: AllNewsComponent},
        {path: 'not-published-news', component: NotPublishedNewsComponent},
        {path: 'published-news', component: PublishedNewsComponent},
        {path: 'translate/:lang/:id', component: TranslateNewsComponent}
      ]
    }
  ]
  },
  {
    path: 'moderator', children: [
    {
      path: '', component: ModeratorComponent, canActivate: [ModeratorGuard],
      children: [
        {path: 'create-news', component: CreateNewsComponent},
        {path: 'all-news', component: AllNewsComponent},
        // { path: 'not-published-news', component: NotPublishedNewsComponent },
        {path: 'my-news', component: MyNewsComponent},
        {path: 'translate/:lang/:id', component: TranslateNewsComponent}
      ]
    }
  ]
  },
  {path: 'log-in', component: LogInComponent},
  {path: '403', component: ForbiddenComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    AdminGuard,
    ModeratorGuard,
  ],
  declarations: []
})

export class AppRoutingModule {
  constructor() {
  }
}
