import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { MatTooltip } from '@angular/material/tooltip'

@Component({
    selector: 'app-main-header',
    standalone: true,
    imports: [
        MatIconButton,
        MatIcon,
        MatTooltip
    ],
    templateUrl: './main-header.component.html',
    styleUrl: './main-header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainHeaderComponent {
    @Input() username!: string | null
    @Output() logoutEmitter: EventEmitter<void> = new EventEmitter()

    logout(): void {
        this.logoutEmitter.emit()
    }
}
