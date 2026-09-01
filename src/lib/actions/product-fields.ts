export function readProductFields(formData: FormData) {
  return {
    category_id: String(formData.get('categoryId') ?? ''),
    title: String(formData.get('title') ?? '').trim(),
    hindi_title: String(formData.get('hindiTitle') ?? '').trim() || null,
    description: String(formData.get('description') ?? '').trim() || null,
    price: Number(formData.get('price') ?? 0),
    original_price: formData.get('originalPrice') ? Number(formData.get('originalPrice')) : null,
    weight: String(formData.get('weight') ?? '').trim() || null,
    image_url: String(formData.get('imageUrl') ?? '').trim() || null,
    lab_pesticide_ppm: String(formData.get('labPesticidePpm') ?? '').trim() || null,
    lab_purity_score: String(formData.get('labPurityScore') ?? '').trim() || null,
    harvest_date: String(formData.get('harvestDate') ?? '').trim() || null,
    farm_origin: String(formData.get('farmOrigin') ?? '').trim() || null,
  };
}
