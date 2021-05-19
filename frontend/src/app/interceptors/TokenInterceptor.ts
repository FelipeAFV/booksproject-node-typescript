import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { catchError, filter, map, switchMap, take } from "rxjs/operators";
import { AuthService } from "../services/auth/auth.service";
import { TokenService } from "../services/token/token.service";


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    isRefreshing: boolean = false;
    private refreshSubject : BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private authService: AuthService, private tokenService: TokenService) {
        
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError((error) => {
            console.log('interceptando request', error);
            if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403)) {

                return this.handle401Error(req, next);
            } else {
                return throwError(error);
              }
        }))
    }

    
    private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        if (!this.isRefreshing) {
            console.log('Comenzando a manejar error 401 desde', request.url);
            this.isRefreshing = true;
            this.refreshSubject.next(null);
            
            return this.authService.refresh({REFRESH_TOKEN: this.tokenService.getRefreshToken() }).pipe(
                switchMap((res: any) => {
                    console.log('Respuesta desde refresh()', res);
                    this.isRefreshing = false;
                    this.refreshSubject.next(res.REFRESH_TOKEN);
                    this.tokenService.storeRefreshToken(res.REFRESH_TOKEN);
                    return next.handle(request);
                }),
                catchError((err) => {
                    console.log('Este es un error', err);
                    /**En caso de que exista un error se debe notificar a los suscriptores de
                     * BehaviorSubject, y que estos puedan cancelar el request que emitieron,
                     * devultiendo un error (throwError())
                     */
                    this.refreshSubject.next(err);
                    return throwError(err);
                })
                );
                
        } else {
            console.log('sajhfjshfgasjfgjh');
            return this.refreshSubject.pipe(
                filter(token => token != null),
                take(1),
                /**switchMap permite retornar un nuevo observable, sobreescribiendo
                 * la suscripcion al anterior observable
                 */
                switchMap( data => {
                    console.log('Actualizando request en cola');
                    if (data instanceof HttpErrorResponse) {
                        return throwError(data);
                    }
                console.log('Terminando de manejar error 401');
                this.tokenService.storeRefreshToken(data);
                return next.handle(request).pipe( map( (event) => {
                    console.log('Este es el evento', event);
                    return event;
                }) );
            }));
        }
    }


}