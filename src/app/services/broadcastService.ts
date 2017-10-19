/**
 * Created by helga on 27.01.17.
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

interface Action {
  type: string;
  payload?: any;
}

type ActionCallback = (payload: any) => void;

@Injectable()
export class BroadcastService {
  private handler = new Subject<Action>();

  broadcast(type: string, payload?: any) {
    this.handler.next({ type, payload });
  }

  subscribe(type: string, callback: ActionCallback): Subscription {
    return this.handler
      .filter(message => message.type === type)
      .map(message => message.payload)
      .subscribe(callback);
  }
}
