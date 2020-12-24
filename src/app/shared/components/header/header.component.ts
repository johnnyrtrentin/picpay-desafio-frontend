import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title: string = 'PicPay';
  @Input() subtitle: string = 'Comece a pagar tudo com PicPay agora!';
}