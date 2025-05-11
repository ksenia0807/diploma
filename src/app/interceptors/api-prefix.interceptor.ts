import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Если URL не начинается с http, добавляем префикс API
    if (!req.url.startsWith('http')) {
      const apiReq = req.clone({ url: `http://localhost:3000${req.url}` });
      return next.handle(apiReq);
    }
    return next.handle(req);
  }
}