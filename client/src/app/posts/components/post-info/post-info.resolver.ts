import { SinglePostWithCommentsDTO } from '../models/post-with-comments.dto';
import { PostsService } from '../../posts.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostInfoResolverService
  implements Resolve<SinglePostWithCommentsDTO> {
  constructor(private readonly postsService: PostsService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<SinglePostWithCommentsDTO> {
    const id: number = +route.paramMap.get('id');
    return this.postsService.getSinglePost(id);
  }
}
