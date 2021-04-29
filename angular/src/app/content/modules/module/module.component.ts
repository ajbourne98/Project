import { Component, OnInit } from '@angular/core';
import { Lecture, Module, ModuleService } from 'src/app/services/module.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { faArrowRight, faVideo, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { LoremIpsum } from "lorem-ipsum";
import { Reading } from 'src/app/shared/definitions';
import { MyStuff, MyStuffService } from 'src/app/services/my-stuff.service';
import { DeadlineService } from 'src/app/services/deadline.service';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit {
  public module: Module = null;
  public faArrowRight = faArrowRight;
  public faFilePdf = faFilePdf;
  public faVideo = faVideo;
  public myStuff: MyStuff;

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

  constructor(
    private moduleService: ModuleService,
    private _Activatedroute: ActivatedRoute,
    private myStuffService: MyStuffService,
    private deadlineService: DeadlineService
  ) { }

  ngOnInit(): void {
    let id: string;

    this._Activatedroute.paramMap.subscribe((params: ParamMap) => {
      id = params.get('id');
      this.module = this.moduleService.getModuleById(+id);
      this.getLecturesForWeek();
      this.deadlineService.setImportantDeadlines(this.module.deadlines);
    });

    this.myStuffService.myStuffObservable.subscribe((stuff: MyStuff) => {
      this.myStuff = stuff;
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

  public addReadingToMyStuff(reading: Reading): void {
    this.myStuffService.addReadingToMyStuff(reading);
  }

  public removeReadingFromMyStuff(reading: Reading): void {
    this.myStuffService.removeReadingFromMyStuff(reading);
  }

  public checkReadingInMyStuff(reading: Reading): boolean {
    return this.myStuff.reading.includes(reading);
  }
}
