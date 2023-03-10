package sixman.helfit.domain.board.service;

import org.springframework.stereotype.Service;
import sixman.helfit.domain.board.entity.Board;
import sixman.helfit.domain.board.entity.BoardTag;

import sixman.helfit.domain.board.repository.BoardRepository;
import sixman.helfit.domain.category.service.CategoryService;

import sixman.helfit.domain.tag.service.TagService;

import sixman.helfit.domain.user.service.UserService;
import sixman.helfit.exception.BusinessLogicException;
import sixman.helfit.exception.ExceptionCode;

import java.util.Optional;

@Service
public class BoardService {
    private final BoardRepository boardRepository;
    private final TagService tagService;
    private final CategoryService categoryService;

    private final UserService userService;

    public BoardService(BoardRepository boardRepository, TagService tagService,
                        CategoryService categoryService, UserService userService) {
        this.boardRepository = boardRepository;
        this.tagService = tagService;
        this.categoryService = categoryService;
        this.userService = userService;
    }

    public Board createBoard(Board board){
        verifyBoard(board);
        for (BoardTag boardTag: board.getBoardTags()) {
            tagService.findTag(boardTag.getTag());
        }
        return boardRepository.save(board);
    }

    private void verifyBoard(Board board) {
        userService.findUserByUserId(board.getUser().getUserId());

        categoryService.verifiedCategoryById(board.getCategory().getCategoryId());
    }

    public Board findBoardById(Long boardId){
        Optional<Board> optionalBoard = boardRepository.findById(boardId);
        return optionalBoard.orElseThrow(() -> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
    }


}
