import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services/authGuard';
import { AdminGuard } from './services/adminGuard';
import { ModeratorGuard } from './services/moderatorGuard';

import { AppComponent } from './app.component';
import { LogInComponent } from './layout/log-in/log-in.component';
import { NotFoundComponent } from './layout/exceptions/not-found/not-found.component';
import { ForbiddenComponent } from './layout/exceptions/forbidden/forbidden.component';
import { LayoutComponent } from './layout/layout.component';
import { NewsByTypeComponent } from './layout/news/news-by-type/news-by-type.component';
import { NewsComponent } from './layout/news/news.component';
import { NewsDetailComponent } from './layout/news/news-detail/news-detail.component';

import { AdministratorComponent } from './administrator/administrator.component';
import { CreateModeratorComponent } from './administrator/moderators/create-moderator/create-moderator.component';
import { ModeratorListComponent } from './administrator/moderators/moderator-list/moderator-list.component';
import { CreateNewsComponent } from './administrator/news/create-news/create-news.component';
import { NotPublishedNewsComponent } from './administrator/news/not-published-news/not-published-news.component';
import { PublishedNewsComponent } from './administrator/news/published-news/published-news.component';
import { MyNewsComponent } from './administrator/news/my-news/my-news.component';

import { ModeratorComponent } from './moderator/moderator.component';
import { ModeratorDetailComponent } from './administrator/moderators/moderator-detail/moderator-detail.component';
import { MyProfileComponent } from './layout/my-profile/my-profile.component';

const appRoutes: Routes = [
    { path: '', children: [
        { path: '', redirectTo: '/uzl', pathMatch: 'full' },
        { path: 'uzl', component: LayoutComponent , children: [
            { path: '', component: NewsComponent, runGuardsAndResolvers: 'always' },
            { path: 'my-profile', component: MyProfileComponent, canActivate: [AuthGuard] },
            { path: 'topic/:type', component: NewsByTypeComponent },
            { path: 'news/:id', component: NewsDetailComponent }
        ]},
        { path: 'uzk', component: LayoutComponent , children: [
            { path: '', component: NewsComponent },
            { path: 'my-profile', component: MyProfileComponent, canActivate: [AuthGuard] },
            { path: 'topic/:type', component: NewsByTypeComponent },
            { path: 'news/:id', component: NewsDetailComponent }
        ]}
    ]},
    { path: 'administrator', children: [
        { path: '', component: AdministratorComponent, canActivate: [AdminGuard], 
            children: [
                { path: 'moderators', children: [
                    { path: '', component: ModeratorListComponent },
                    { path: 'create-moderator', component: CreateModeratorComponent },
                    { path: 'detail', component: ModeratorDetailComponent }
                ]},
                { path: 'create-news', component: CreateNewsComponent },
                { path: 'my-news', component: MyNewsComponent },
                { path: 'not-published-news', component: NotPublishedNewsComponent },
                { path: 'published-news', component: PublishedNewsComponent },
            ]
        }
    ]},
    { path: 'moderator', children: [
        { path: '', component: ModeratorComponent, canActivate: [ModeratorGuard],
            children: [
                { path: 'create-news', component: CreateNewsComponent },
                { path: 'not-published-news', component: NotPublishedNewsComponent },
                { path: 'my-news', component: MyNewsComponent }
            ]
        }
    ]},
    { path: 'log-in', component: LogInComponent },
    { path: '403', component: ForbiddenComponent },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'})
    ],
    exports: [RouterModule],
    providers: [
        AuthGuard,
        AdminGuard,
        ModeratorGuard
    ],
    declarations: []
})

export class AppRoutingModule {
}