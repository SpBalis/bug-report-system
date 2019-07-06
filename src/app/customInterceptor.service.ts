import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable()

export class CustomInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    req = req.clone({ setHeaders: { Authorization: 'code.hub.ng5.token' } });
    return next.handle(req)
      .pipe(map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.status === 200) {
            console.log('I am 200');
          }
        }
        return event;

        // if (req.url.endsWith('/bugs')) {
        //     req = req.clone({
        //         setHeaders: { Authorization: 'code.hub.ng5.token'
        //         }
        //     });
        // }
        // return next.handle(req);
      }));
  }
}
