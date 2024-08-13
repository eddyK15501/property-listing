'use server';

export async function addProperty(formData) {
  const amenities = formData.getAll('amenities');
  const images = formData
    .getAll('images')
    .filter((img) => img.name !== '')
    .map((img) => img.name);

  const propData = {
    type: formData.get('type'),
    name: formData.get('name'),
    description: formData.get('description'),
    location: {
      street: formData.get('location.street'),
      city: formData.get('location.city'),
      state: formData.get('location.state'),
      zipcode: formData.get('location.zipcode'),
    },
    beds: formData.get('beds'),
    baths: formData.get('baths'),
    square_feet: formData.get('square_feet'),
    amenities,
    rates: {
      weekly: formData.get('rates.weekly'),
      monthly: formData.get('rates.monthly'),
      nightly: formData.get('rates.nightly'),
    },
    seller_info: {
      name: formData.get('seller.name'),
      email: formData.get('seller.email'),
      phone: formData.get('seller.phone'),
    },
    images,
  };

  console.log(propData)
}
