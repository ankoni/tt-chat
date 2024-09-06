import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'

@Component({
    selector: 'app-main-header',
    standalone: true,
    imports: [
        MatIconButton,
        MatIcon
    ],
    templateUrl: './main-header.component.html',
    styleUrl: './main-header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainHeaderComponent {
    @Input() username!: string | null
}
