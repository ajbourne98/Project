import { Component, OnInit } from '@angular/core';
import { LoremIpsum } from "lorem-ipsum";
import { ModuleService } from 'src/app/services/module-service.service';
import { MyStuff, MyStuffService } from 'src/app/services/my-stuff.service';
import { Reading } from 'src/app/shared/definitions';

@Component({
  selector: 'app-my-stuff',
  templateUrl: './my-stuff.component.html',
  styleUrls: ['./my-stuff.component.scss']
})
export class MyStuffComponent implements OnInit {
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

  constructor(private myStuffService: MyStuffService, private moduleService: ModuleService) { }

  ngOnInit(): void {
    this.myStuffService.myStuffObservable.subscribe((stuff: MyStuff) => {
      this.myStuff = stuff;
    });
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

  public getModuleById(id: number) {
    return this.moduleService.getModuleById(id);
  }
}
