import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL = environment.imgPath;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(image: string, size: string = 'w500'): string {

    if (!image) {
      return './assets/no_image.jpg';
    }

    const imgUrl = `${URL}/${size}${image}`;
    // console.log(imgUrl);
    return imgUrl;
  }

}
