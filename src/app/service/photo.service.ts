import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, throwError } from "rxjs";
import { Photo } from "../models/photo";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private photoUser = new BehaviorSubject<string>("https://i1.sndcdn.com/avatars-000437232558-yuo0mv-t500x500.jpg");
  photoUrl = "https://app-tienda-paprika.herokuapp.com/photo";

  constructor(
    private httpClient: HttpClient,
  ) { }

  get isPhoto():Observable<string>{
    return this.photoUser.asObservable();
  }

  public getPhotoByUser(user: string): Observable<Photo> {
    return this.httpClient.get<Photo>(`${this.photoUrl}/findPhotoByUser/${user}`)
    .pipe(
      map((res: Photo) => {
        this.photoUser.next(res.file);
        return res;
      }),
      catchError((err) => this.handlerError(err))
    );
  }
  private handlerError(err:any): Observable<never>{
    let errorMessage = "Ocurrio un error";
    if(err){
      errorMessage = `Error: code ${err.message}`;
    }
    return throwError(errorMessage);
  }

}