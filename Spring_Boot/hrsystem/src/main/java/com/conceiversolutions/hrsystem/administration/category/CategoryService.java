package com.conceiversolutions.hrsystem.administration.category;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.conceiversolutions.hrsystem.administration.task.Task;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<Category> getCategories() {
        List<Category> categories = categoryRepository.findAll();
        for (Category category : categories) {
            for (Task task : category.getTasks()) {
                task.setCategory(null);
                task.setTaskListItems(new ArrayList<>());
            }
        }
        return categories;
    }

    public Category getCategoryById(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalStateException("Category with ID: " + categoryId + " does not exist!"));
        for (Task task : category.getTasks()) {
            task.setCategory(null);
            task.setTaskListItems(new ArrayList<>());
        }
        return category;
    }

    public void addNewCategory(Category category) {
        Optional<Category> categoryOptional = categoryRepository.findCategoryByName(category.getName());
        if (categoryOptional.isPresent()) {
            throw new IllegalStateException("Category name already exists!");
        }
        categoryRepository.saveAndFlush(category);
    }

    public void deleteCategory(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalStateException("Category with ID: " + categoryId + " does not exist!"));
        if (!category.getTasks().isEmpty()) {
            throw new IllegalStateException("Unable to delete as category contains tasks");
        }
        categoryRepository.deleteById(categoryId);
    }

    @Transactional
    public void editCategory(Long categoryId, String categoryName) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalStateException("Category with ID: " + categoryId + " does not exist!"));
        if (categoryName != null && categoryName.length() > 0 && !Objects.equals(category.getName(), categoryName)) {
            category.setName(categoryName);
        }
    }

}
