import { DeltaVaultProduct } from "../generated/templates";
import { ProductCreate } from "../generated/DeltaVaultFactory/DeltaVaultFactory";
import { fetchProduct } from "./delta-vault-product";

export function handleProductCreate(event: ProductCreate): void {
  fetchProduct(event.params.product);
  DeltaVaultProduct.create(event.params.product);
}
