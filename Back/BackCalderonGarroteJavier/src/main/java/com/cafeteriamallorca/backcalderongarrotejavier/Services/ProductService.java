package com.cafeteriamallorca.backcalderongarrotejavier.Services;

import com.cafeteriamallorca.backcalderongarrotejavier.Model.Product;
import com.cafeteriamallorca.backcalderongarrotejavier.Repository.IProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
public class ProductService {
    private final IProductRepository iProductRepository;
    private final UploadFile uploadFile;

    public ProductService(IProductRepository iProductRepository, UploadFile uploadFile) {
        this.iProductRepository = iProductRepository;
        this.uploadFile = uploadFile;
    }

    public Product save(Product product, MultipartFile multipartFile) throws IOException {
        if (product.getId() != 0) { // cuando es un producto modificado
            if (multipartFile == null) {
                // No se hace nada con urlImage porque es la existente
            } else {
                if (product.getUrlImage() != null) {
                    String nameFile = product.getUrlImage().substring(29);
                    log.info("este es el nombre de la imagen: {}", nameFile);
                    if (!nameFile.equals("default.jpg")) {
                        uploadFile.delete(nameFile);
                    }
                }
                product.setUrlImage(uploadFile.upload(multipartFile));
            }
        } else {
            product.setUrlImage(uploadFile.upload(multipartFile));
        }

        return this.iProductRepository.save(product);
    }

    public Iterable<Product> findAll() {
        return this.iProductRepository.findAll();
    }

    public Product findById(Integer id) {
        return this.iProductRepository.findById(id);
    }

    public void deleteById(Integer id) {
        Product product = findById(id);
        if (product != null && product.getUrlImage() != null) {
            String nameFile = product.getUrlImage().substring(29);
            log.info("este es el nombre de la imagen: {}", nameFile);
            if (!nameFile.equals("default.jpg")) {
                uploadFile.delete(nameFile);
            }
        }
        this.iProductRepository.deleteById(id);
    }
}
