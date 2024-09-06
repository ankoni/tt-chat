import { Component, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { AppService } from './core/services/app.service'

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    constructor(
        private appService: AppService
    ) {
    }

    ngOnInit(): void {
        this.appService.initAuthData()
    }
}
