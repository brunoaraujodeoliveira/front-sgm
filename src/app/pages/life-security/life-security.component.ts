import { Component, OnInit } from '@angular/core';
import { LifeSecurityService } from './life-security.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-life-security',
  templateUrl: './life-security.component.html',
  styleUrls: ['./life-security.component.scss']
})
export class LifeSecurityComponent implements OnInit {

  message = '';

  constructor(private lifeSecurityService: LifeSecurityService) { }

  ngOnInit(): void {
  }

  syncEvent() {
    this.message = 'Os dados serão sincronizados!';
    
    this.lifeSecurityService.dataSyncronism().subscribe(
      (event: any): void => {
        if (event instanceof HttpResponse) {
          this.message = event.body.text;
        }
      },
      (err: any) => {
        console.log(err);
      });
  }
}
