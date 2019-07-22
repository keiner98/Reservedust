import { MediaMatcher } from "@angular/cdk/layout";
import { NgForm, FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";

@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.scss"],
})
export class testComponent implements OnInit {
  myForm: FormGroup;
  img: string = "default.jpg";
  selectedFile: File = null;
  source: any = "";
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.myForm = this.fb.group({
      name: ["Wilmer"],
      lastname: ["Cantillo"],
    });
    this.myForm.valueChanges.subscribe(console.log);
  }
  get name() {
    return this.myForm.get("name").value;
  }
  get lastname() {
    return this.myForm.get("lasname").value;
  }
  /*
  onFile(e) {
    console.log(e);
    let reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.source = reader.result;
      console.log(this.source);
    };
    if (file) {
      console.log(typeof file);
      reader.readAsDataURL(file);
    } else {
      this.source = "";
    }
    console.log(this.source);
  }
  */
  async onFile(e) {
    this.selectedFile = <File>e.target.files[0];
    const fd = new FormData();
    fd.append("perfil", this.selectedFile);
    try {
      let res = await fetch("http://localhost:5000/motel/api/upload", {
        method: "POST",
        body: fd,
      });
      let response = await res.json();
      this.img = response.name;
    } catch (error) {
      console.log(error);
    }
  }
  async upload() {}

  async request() {
    //console.log(typeof this.myForm.value);
    let regForm = new FormData();
    for (let field in this.myForm.value) {
      regForm.append(`${field}`, this.myForm.get(`${field}`).value);
    }

    let res = await fetch("http://localhost:5000/motel/api/signup2", {
      method: "POST",
      body: regForm,
    });
    let data = await res.json();
    console.log(data);
  }
}
