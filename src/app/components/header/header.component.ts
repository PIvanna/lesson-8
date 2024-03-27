import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', "../../shared/styles/_mixins.scss"]
})
export class HeaderComponent {
  public menuOpen = false;
  

  openMenu(){
    this.menuOpen = true;
  }

  closeMenu(){
    this.menuOpen = false;
  }
}
