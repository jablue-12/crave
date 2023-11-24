package com.crave.backend.unit.utils;

import com.crave.backend.utils.ImageUtils;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ImageUtilsTest {

    @Test
    void testSuccessCompressImage() {
        // Arrange
        String testString = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec risus tortor. Suspendisse potenti. Vestibulum diam eros, convallis sed maximus sed, pretium non libero. Praesent tincidunt elit vel elementum ullamcorper. Fusce pretium est vel risus viverra mollis. Ut non erat ut est auctor sagittis eu at nisl. Sed facilisis ante.";
        byte[] originalData = testString.getBytes();

        // Act
        byte[] compressedData = ImageUtils.compressImage(originalData);

        // Assert
        assertNotNull(compressedData);
        assertTrue(compressedData.length < originalData.length);

    }

    @Test
    void testSuccessDecompressImage() {
        // Arrange
        byte[] originalData = "Test data for compression.".getBytes();
        byte[] compressedData = ImageUtils.compressImage(originalData);

        // Act
        byte[] decompressedData = ImageUtils.decompressImage(compressedData);

        // Assert
        assertNotNull(decompressedData);
        assertArrayEquals(originalData, decompressedData);
    }

    @Test
    void testFailCompressImage() {
        byte[] compressedData = ImageUtils.compressImage(null);
        assertEquals(0, compressedData.length);
    }

    @Test
    void testFailDecompressImage() {
        byte[] decompressedData = ImageUtils.decompressImage(null);
        assertEquals(0, decompressedData.length);
    }
}
