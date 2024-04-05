import { Injectable } from '@angular/core'
import { NbToastrService } from '@nebular/theme'

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toastrService: NbToastrService) {}

  public showSuccess(message: string) {
    this.toastrService.success(message, 'Erfolg', {
      icon: 'checkmark-circle-2'
    })
  }

  public showError(message: string) {
    this.toastrService.danger(message, 'Fehler', {
      icon: 'alert-triangle',
      duration: 0
    })
  }
}
