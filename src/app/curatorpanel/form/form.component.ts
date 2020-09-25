import { Component, OnInit} from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { GalleryService } from "../../services/gallery.service";
import { ArtModel } from 'src/app/gallery/art.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ArtworkService } from 'src/app/services/artwork.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  editMode: boolean;
  editForm: FormGroup;

  //editSelected: ArtModel = null;
  index: number;
  id: number;

  constructor(private galleryService: GalleryService,
    private artService: ArtworkService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.index = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  initForm(): void {
    let title = '';
    let artist = '';
    let year = null
    let genre = '';
    let review = '';
    let country = '';
    let imagePath = '';
    

    if (this.editMode) {
      const work = this.galleryService.getWork(this.index);
      
      if (work === undefined) {        
        this.router.navigate(["curator"]);        
        return;
      }

      this.id = work.id;
      title = work.title;
      artist = work.artist;
      year = work.year;
      genre = work.genre;
      review = work.review;
      country = work.country;      
      imagePath = work.imgPath;
    }

    this.editForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'artist': new FormControl(artist, Validators.required),
      'year': new FormControl(year, Validators.required),
      'genre': new FormControl(genre, Validators.required),
      'review': new FormControl(review, Validators.required),
      'country': new FormControl(country, Validators.required),
      'imgPath': new FormControl(imagePath, Validators.required),      
    });
  }

  onSubmit(): void {
    const newWork = new ArtModel(      
      this.editForm.value['title'],
      this.editForm.value['artist'],
      this.editForm.value['year'],
      this.editForm.value['genre'],
      this.editForm.value['review'],
      this.editForm.value['country'],
      this.editForm.value['imgPath'],
      this.id
    );
    if (this.editMode) {      
      this.galleryService.updateWork(this.galleryService.getWork(this.index), 
        newWork)
        .subscribe(response => {
          console.log(response);
          this.galleryService.initWorks();
        }
        );
    } else {      
      //this.galleryService.addWork(newWork)
      this.galleryService.addWork(this.editForm.value)
        .subscribe(response => {
          console.log(response);
          this.galleryService.initWorks();
        })
    }
  }

  delete() {
    if (this.editMode) {
      //this.galleryService.deleteWork(this.workId);
      this.galleryService.deleteWork(this.galleryService.getWork(this.index))
        .subscribe(response => {
          console.log(response);
          this.galleryService.initWorks();
        });
      this.router.navigate(["curator"]);  
    }    
  }

}
