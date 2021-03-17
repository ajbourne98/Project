import { Component, OnInit } from '@angular/core';
import { Module, ModuleService } from 'src/app/services/module-service.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { faArrowRight, faVideo } from '@fortawesome/free-solid-svg-icons';
import { LoremIpsum } from "lorem-ipsum";

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit {
  public module: Module = null;
  public faArrowRight = faArrowRight;
  public faVideo = faVideo;

  public lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });

  constructor(private moduleService: ModuleService, private _Activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    let id: string;

    this._Activatedroute.paramMap.subscribe((params: ParamMap) => {
      id = params.get('id');
      this.module = this.moduleService.getModuleById(+id);
    });
  }
}
