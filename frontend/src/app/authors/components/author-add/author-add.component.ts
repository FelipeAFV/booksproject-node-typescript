import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Author } from 'src/app/model/Author';
import { AuthorService } from '../../services/author/author.service';

@Component({
  selector: 'app-author-add',
  templateUrl: './author-add.component.html',
  styleUrls: ['./author-add.component.css']
})
export class AuthorAddComponent implements OnInit {


  addForm: FormGroup;

  constructor(private authorService: AuthorService) { }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      birthdate: new FormControl('', Validators.required),
      nationality: new FormControl('', Validators.required)
    })
  }

  addAuthor() {
    if (this.addForm.invalid) return;
    const body = this.addForm.value;
    this.authorService.addAuthor(body).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
