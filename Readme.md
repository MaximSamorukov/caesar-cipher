CLI Caesar cipher

# Instruction

 Caesar cipher CLI application is to decode or encode information with Caesar cipher method. Data can be input from CL or can be read from file. Transformed data can be output to CL or written to the file. Application works only with latin alphabet.

1. Clone the repository to your directory.

2. `sudo npm link` or `sudo npm install`;

3. To launch the cli you may:

3.1. my_caesar_cli <options>;

3.2. node index <options>;

4. If working in CL, to exit press `Ctrl + C`;

5. Options:

5.1. Options can be in any sequence;

5.2. `-s`, `--shift` - a positive integer or zero. Argument required;

5.3. `-a` , `--action` - can be `encode` or `decode` only. Argument required;

5.4. `-i` , `--input` - input sourse. If no argument, then `process.stdin` used;

5.5. `-o` , `--output` - output channel. If no argument, then `process.stdout` used. Application doesn't create new file according to path provided. So, please, use the path of an existing file.

# Examples of usage

$ my_caesar_cli -a encode -s 7 -i "./input.txt" -o "./output.txt"

$ my_caesar_cli -a encode -s 7 -i ./input.txt -o ./output.txt

$ node index --action encode --shift 7 --input plain.txt --output encoded.txt
