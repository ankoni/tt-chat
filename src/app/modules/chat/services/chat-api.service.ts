import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { forkJoin, map, Observable, switchMap } from 'rxjs'
import { ChannelData, ChannelUserRel } from '../models/channel.model'

@Injectable({ providedIn: 'root' })
export class ChatApiService {

    constructor(
        private http: HttpClient,
    ) {
    }

    getAllChannelsData(userId: string): Observable<ChannelData[]> {
        return this.getChannelsRequest(userId)
            .pipe(
                map((channelIds: string[]) => channelIds.join('|')),
                switchMap((idsStr: string) => {
                    return this.http.get<ChannelData[]>(`/api/channels?id_like=${idsStr}`)
                })
            )
    }

    getChannelsRequest(userId: string): Observable<string[]> {
        return this.http.get<ChannelUserRel[]>(`/api/user_channels?user_id=${userId}`)
            .pipe(map(data => data.map((it: ChannelUserRel) => it.channel_id)))
    }

    getChannel(channelId: string): Observable<ChannelData> {
        return this.http.get<ChannelData>(`/api/channels/${channelId}`)
    }
}
