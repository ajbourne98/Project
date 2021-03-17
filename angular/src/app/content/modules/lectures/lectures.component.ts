import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { faArrowLeft, faVideo } from '@fortawesome/free-solid-svg-icons';
import { Module, ModuleService } from 'src/app/services/module-service.service';

@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.component.html',
  styleUrls: ['./lectures.component.scss']
})
export class LecturesComponent implements OnInit {
  public module: Module;
  public faArrowLeft = faArrowLeft;
  public faVideo = faVideo;

  constructor(private moduleService: ModuleService, private _Activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    let id: string;

    this._Activatedroute.paramMap.subscribe((params: ParamMap) => {
      id = params.get('id');
      this.module = this.moduleService.getModuleById(+id);
    });
  }

}
