package com.cafeteriamallorca.backcalderongarrotejavier.Controllers;

import com.cafeteriamallorca.backcalderongarrotejavier.Model.Product;
import com.cafeteriamallorca.backcalderongarrotejavier.Services.ProductService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;

@RestController
@RequestMapping("/api/v1/admin/products")
@Slf4j
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ResponseEntity<Product> save(@RequestParam("id") Integer id,
                                        @RequestParam("code") String code,
                                        @RequestParam("name") String name,
                                        @RequestParam("description") String description,
                                        @RequestParam("price") BigDecimal price,
                                        @RequestParam(value = "urlImage", required = false) String urlImage,
                                        @RequestParam("userId") Integer userId,
                                        @RequestParam("categoryId") Integer categoryId,
                                        @RequestParam(value = "image", required = false) MultipartFile multipartFile
    ) throws IOException {
        Product product = new Product();
        product.setId(id);
        product.setCode(code);
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setCategoryId(categoryId);
        product.setUserId(userId);

        if (urlImage != null && !urlImage.isEmpty()) {
            product.setUrlImage(urlImage);
        }

        log.info("Nombre producto: {}", product.getName());
        return new ResponseEntity<>(productService.save(product, multipartFile), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Integer id,
                                                 @RequestParam("code") String code,
                                                 @RequestParam("name") String name,
                                                 @RequestParam("description") String description,
                                                 @RequestParam("price") BigDecimal price,
                                                 @RequestParam(value = "urlImage", required = false) String urlImage,
                                                 @RequestParam("userId") Integer userId,
                                                 @RequestParam("categoryId") Integer categoryId,
                                                 @RequestParam(value = "image", required = false) MultipartFile multipartFile
    ) throws IOException {
        Product product = productService.findById(id);
        product.setCode(code);
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setCategoryId(categoryId);
        product.setUserId(userId);

        if (urlImage != null && !urlImage.isEmpty()) {
            product.setUrlImage(urlImage);
        }

        log.info("Nombre producto: {}", product.getName());
        return new ResponseEntity<>(productService.save(product, multipartFile), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Iterable<Product>> findAll() {
        return ResponseEntity.ok(productService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> findById(@PathVariable Integer id) {
        return ResponseEntity.ok(productService.findById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteById(@PathVariable Integer id) {
        productService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
