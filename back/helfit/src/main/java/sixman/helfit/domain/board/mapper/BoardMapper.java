package sixman.helfit.domain.board.mapper;

import org.mapstruct.Mapper;
import sixman.helfit.domain.board.dto.BoardDto;
import sixman.helfit.domain.board.entity.Board;
import sixman.helfit.domain.board.entity.BoardTag;
import sixman.helfit.domain.category.entity.Category;
import sixman.helfit.domain.tag.entity.Tag;
import sixman.helfit.domain.user.entity.User;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface BoardMapper {
    default Board boardPostToBoard(BoardDto.Post postDto,Long categoryId, Long userId){
        if ( postDto == null ) {
            return null;
        }
        Board board = new Board();
        User user = new User();
        Category category = new Category();
        user.setUserId(userId);
        category.setCategoryId(categoryId);

        board.setTitle(postDto.getTitle());
        board.setText(postDto.getText());
        board.setBoardImageUrl(postDto.getBoardImageUrl());

        if(postDto.getBoardTags() !=null) {
           List<BoardTag> boardTags = postDto.getBoardTags().stream().
                    map(BoardTagDto -> {
                        BoardTag boardTag = new BoardTag();
                        Tag tag = new Tag();
                        tag.setTagName(BoardTagDto.getTagName());
                        boardTag.addTag(tag);
                        boardTag.addBoard(board);

                        return boardTag;
                    }).collect(Collectors.toList());
        }
        board.setUser(user);
        board.setCategory(category);

        return board;
    }

}
