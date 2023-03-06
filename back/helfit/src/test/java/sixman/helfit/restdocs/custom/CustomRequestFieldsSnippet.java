package sixman.helfit.restdocs.custom;

import org.springframework.http.MediaType;
import org.springframework.restdocs.operation.Operation;
import org.springframework.restdocs.payload.AbstractFieldsSnippet;
import org.springframework.restdocs.payload.FieldDescriptor;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CustomRequestFieldsSnippet extends AbstractFieldsSnippet {
    public CustomRequestFieldsSnippet(
        String type,
        List<FieldDescriptor> descriptors,
        Map<String, Object> attributes,
        boolean ignoreUndocumentedFields
    ) {
        super(type, descriptors, attributes, ignoreUndocumentedFields);
    }

    @Override
    protected MediaType getContentType(Operation operation) {
        return operation.getRequest().getHeaders().getContentType();
    }

    @Override
    protected byte[] getContent(Operation operation) throws IOException {
        return operation.getRequest().getContent();
    }

    public static CustomRequestFieldsSnippet customRequestFields(
        String type,
        Map<String, Object> attributes,
        FieldDescriptor... descriptors
    ) {
        return new CustomRequestFieldsSnippet(type, Arrays.asList(descriptors), attributes, true);
    }

    public static CustomRequestFieldsSnippet customRequestFields(
        String type,
        FieldDescriptor... descriptors
    ) {
        HashMap<String, Object> attributes = new HashMap<>();
        return new CustomRequestFieldsSnippet(type, Arrays.asList(descriptors), attributes, true);
    }
}
