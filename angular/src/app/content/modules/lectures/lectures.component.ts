import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { faArrowLeft, faVideo } from '@fortawesome/free-solid-svg-icons';
import { Lecture, Module, ModuleService } from 'src/app/services/module.service';

@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.component.html',
  styleUrls: ['./lectures.component.scss']
})
export class LecturesComponent implements OnInit {
  private module: Module;
  public faArrowLeft = faArrowLeft;
  public faVideo = faVideo;
  public lectures: Lecture[] = [];

  constructor(private moduleService: ModuleService, private _Activatedroute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let id: string;

    this._Activatedroute.paramMap.subscribe((params: ParamMap) => {
      id = params.get('id');
      this.module = this.moduleService.getModuleById(+id);
      this.lectures = this.module.lectures;
      this.sortLectures('DESC');
    });
  }

  public toggleLectureWatched(lectureId: number): void {
    this.moduleService.toggleLectureWatched(this.module.id, lectureId);
  }

  public goBackToModule(): void {
    this.router.navigateByUrl(`/modules/${this.module.id}`);
  }

  public sortLectures(sortBy: string) {
    this.lectures = this.lectures.sort((a: Lecture, b: Lecture) => {
      return a.date.getTime() - b.date.getTime();
    });

    if (sortBy === 'DESC') {
      this.lectures = this.lectures.reverse();
    }
  }
}
