// powerCard.js
export function renderPower(alias, nom, description) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('power');
  
    const label = document.createElement('div');
    label.textContent = nom;
  
    const img = document.createElement('img');
    img.src = `assets/heroes/${alias}/power/${nom}.webp`;
    img.title = description;
  
    wrapper.appendChild(label);
    wrapper.appendChild(img);
    return wrapper;
  }
  