package com.crave.backend.utils;

import java.io.ByteArrayOutputStream;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

public class ImageUtils {

    private ImageUtils() {
        throw new IllegalStateException("Utility class");
    }

    public static byte[] compressImage(byte[] data) {
        try {
            Deflater deflater = new Deflater();
            deflater.setLevel(Deflater.BEST_COMPRESSION);
            deflater.setInput(data);
            deflater.finish();

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
            byte[] tmp = new byte[4 * 1024];
            while (!deflater.finished()) {
                int size = deflater.deflate(tmp);
                outputStream.write(tmp, 0, size);
            }

            outputStream.close();
            return outputStream.toByteArray();

        } catch (Exception ignored) {
            return new byte[0];
        }
    }


    public static byte[] decompressImage(byte[] data) {
        try {
            Inflater inflater = new Inflater();
            inflater.setInput(data);
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
            byte[] tmp = new byte[4 * 1024];

            while (!inflater.finished()) {
                int count = inflater.inflate(tmp);
                outputStream.write(tmp, 0, count);
            }
            outputStream.close();
            return outputStream.toByteArray();

        } catch (Exception ignored) {
            return new byte[0];
        }
    }
}
