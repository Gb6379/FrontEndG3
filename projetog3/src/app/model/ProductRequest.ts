import { NumberValueAccessor } from "@angular/forms";

export interface ProductRequest {

  name?: string;
  price?: string;
  imageUrl?: string;
  amount?: string;
  companyId: number;
  categoryId: number;
    
}