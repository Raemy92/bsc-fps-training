import { ValidationErrors } from '@angular/forms'

export const VALIDATION_ERROR_MESSAGES = <
  K extends keyof ValidationErrors,
  U extends ValidationErrors[K]
>(
  error: K,
  errorValue: U,
  fieldName: string
): string | undefined => {
  return (
    {
      required: `${fieldName} wird benötigt`,
      minlength: `${fieldName} muss mindestens ${errorValue.requiredLength} Zeichen enthalten`,
      maxlength: `${fieldName} darf höchstens ${errorValue.requiredLength} Zeichen enthalten`,
      email: `${fieldName} muss eine gültige E-Mail-Adresse sein`,
      pattern: `${fieldName} muss folgendes Vorgaben erfüllen: ${errorValue.requiredPattern}`,
      min: `${fieldName} muss mindestens ${errorValue.min} sein`,
      max: `${fieldName} darf höchstens ${errorValue.max} sein`,
      passwordMismatch: `Passwörter stimmen nicht überein`
    } as Record<K, string>
  )[error]
}
