import { Component, OnInit } from '@angular/core';
import { Lecture, Module, ModuleService } from 'src/app/services/module-service.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { faArrowRight, faVideo } from '@fortawesome/free-solid-svg-icons';
import { LoremIpsum } from "lorem-ipsum";
import { DateService } from 'src/app/services/date.service';

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

  constructor(private moduleService: ModuleService, private _Activatedroute: ActivatedRoute, private dateService: DateService) { }

  ngOnInit(): void {
    let id: string;

    this._Activatedroute.paramMap.subscribe((params: ParamMap) => {
      id = params.get('id');
      this.module = this.moduleService.getModuleById(+id);
      this.getLecturesForWeek();
    });
  }

  public getLecturesForWeek(): Lecture[] {
    let today = new Date(), lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    return this.module.lectures.filter((lecture: Lecture) => {
      return lecture.date >= lastWeek && lecture.date <= today;
    });
  }

  public toggleLectureWatched(lectureId: number): void {
    this.moduleService.toggleLectureWatched(this.module.id, lectureId);
  }
}
