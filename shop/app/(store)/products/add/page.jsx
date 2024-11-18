"use client"

import React, { useState } from "react";

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    subCategory: "",
    brand: "",
    rating: "",
    description: "",
    price: "",
    date: "",
    othersColors: [
      {
        color: "",
        images: "",
        stock: 0,
        size: null // Par défaut null, ce qui permet de ne pas avoir à remplir la taille pour certains produits
      }
    ]
  });

  // Met à jour les champs du produit général
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Met à jour les champs spécifiques de la couleur
  const handleColorChange = (index, e) => {
    const { name, value } = e.target;
    const updatedColors = [...product.othersColors];
    updatedColors[index][name] = value;
    setProduct((prevState) => ({
      ...prevState,
      othersColors: updatedColors
    }));
  };

  // Gère la sélection des tailles, uniquement pour les vêtements ou chaussures
  const handleSizeChange = (index, e) => {
    const { value } = e.target;
    const updatedColors = [...product.othersColors];

    // Si 'size' est null, on l'initialise comme un tableau vide
    if (updatedColors[index].size === null) {
      updatedColors[index].size = [];
    }

    // Ajoute ou retire la taille
    const sizeExists = updatedColors[index].size.includes(value);
    if (sizeExists) {
      updatedColors[index].size = updatedColors[index].size.filter((size) => size !== value);
    } else {
      updatedColors[index].size.push(value);
    }

    setProduct((prevState) => ({
      ...prevState,
      othersColors: updatedColors
    }));
  };

  // Gère le changement de catégorie et ajuste les tailles en conséquence
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setProduct((prevState) => ({
      ...prevState,
      category: selectedCategory,
      othersColors: prevState.othersColors.map((color) => ({
        ...color,
        size: selectedCategory === "Vêtements" || selectedCategory === "Chaussures" ? ["S", "M", "L"] : null
      }))
    }));
  };

  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(product)
  }
  return (
    <form onSubmit={handleSubmit}>
      {/* Nom du produit */}
      <div>
        <label>Nom du produit</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleInputChange}
        />
      </div>

      {/* Catégorie */}
      <div>
        <label>Catégorie</label>
        <select name="category" value={product.category} onChange={handleCategoryChange}>
          <option value="">Sélectionner une catégorie</option>
          <option value="Vêtements">Vêtements</option>
          <option value="Chaussures">Chaussures</option>
          <option value="Sacs">Sacs</option>
          <option value="Accessoires">Accessoires</option>
        </select>
      </div>

      {/* Sous-catégorie */}
      <div>
        <label>Sous-catégorie</label>
        <input
          type="text"
          name="subCategory"
          value={product.subCategory}
          onChange={handleInputChange}
        />
      </div>

      {/* Marque */}
      <div>
        <label>Marque</label>
        <input
          type="text"
          name="brand"
          value={product.brand}
          onChange={handleInputChange}
        />
      </div>

      {/* Évaluation */}
      <div>
        <label>Évaluation</label>
        <input
          type="number"
          name="rating"
          value={product.rating}
          onChange={handleInputChange}
        />
      </div>

      {/* Description */}
      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleInputChange}
        />
      </div>

      {/* Prix */}
      <div>
        <label>Prix</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleInputChange}
        />
      </div>

      {/* Date */}
      <div>
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={product.date}
          onChange={handleInputChange}
        />
      </div>

      {/* Gestion des couleurs et des tailles */}
      {product.othersColors.map((color, index) => (
        <div key={index}>
          {/* Couleur */}
          <div>
            <label>Couleur</label>
            <input
              type="text"
              name="color"
              value={color.color}
              onChange={(e) => handleColorChange(index, e)}
            />
          </div>

          {/* Images */}
          <div>
            <label>Images</label>
            <input
              type="text"
              name="images"
              value={color.images}
              onChange={(e) => handleColorChange(index, e)}
            />
          </div>

          {/* Stock */}
          <div>
            <label>Stock</label>
            <input
              type="number"
              name="stock"
              value={color.stock}
              onChange={(e) => handleColorChange(index, e)}
            />
          </div>

          {/* Gestion des tailles : uniquement pour les vêtements ou chaussures */}
          {(product.category === "Vêtements" || product.category === "Chaussures") && (
            <div>
              <label>Taille</label>
              {["S", "M", "L"].map((size) => (
                <div key={size}>
                  <input
                    type="checkbox"
                    value={size}
                    checked={color.size?.includes(size)}
                    onChange={(e) => handleSizeChange(index, e)}
                  />
                  <label>{size}</label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <button type="submit">Ajouter le produit</button>
    </form>
  );
};

export default ProductForm;
