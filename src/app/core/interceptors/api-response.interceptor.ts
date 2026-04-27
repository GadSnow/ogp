import { HttpErrorResponse, HttpEventType, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const apiResponseInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<any> => {
    return next(req).pipe(
        map((event) => {
            if (event.type === HttpEventType.Response) {
                const body: any = event.body;

                // Si le backend retourne un status >= 400 dans le JSON, on force l'erreur
                if (body && typeof body === 'object' && body.status && typeof body.status === 'number' && body.status >= 400) {
                    throw new HttpErrorResponse({
                        error: body,
                        headers: event.headers,
                        status: body.status,
                        statusText: body.message || 'Une erreur est survenue',
                        url: event.url || undefined
                    });
                }
            }
            return event;
        })
    );
};
