TESTS_DIR="$(ls $(pwd)/tests)"

for dir in $TESTS_DIR; do
    if [ $dir != configs ]; then
        CURRENT_DIR_PATH="$(pwd)/tests/$dir"
        if [ $dir = services ]; then
            CURRENT_DIR_FILES="$(ls $CURRENT_DIR_PATH)"
            for file in $CURRENT_DIR_FILES; do
                if [ $file = server ]; then
                    node $CURRENT_DIR_PATH/$file/index.js &
                    SERVER_PID=$!
                else
                    node $CURRENT_DIR_PATH/$file
                fi
            done
            kill -9 $SERVER_PID
        else
            CURRENT_DIR_FILES="$(ls $CURRENT_DIR_PATH)"
            for file in $CURRENT_DIR_FILES; do
                node $CURRENT_DIR_PATH/$file
            done
        fi
    fi
done