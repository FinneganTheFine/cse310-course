#include <iostream>
#include <fstream>  
#include <string>

class Filedude {
public:
  std::string filename;
  std::string text;
};

int main() {
  //create object and populate
  Filedude FileObj;
  FileObj.filename = "test.txt";
  FileObj.text = "Some Text";
  
  //select the file and write to it
  std::ofstream outfile(FileObj.filename); 
  outfile << FileObj.text << std::endl;
  outfile.close();
  
  //select file to read from
  std::ifstream infile(FileObj.filename);
  std::string line;
  
  //Read file line by line
  while (std::getline(infile, line)) {
    std::cout << line << std::endl;
  }

  infile.close();

  return 0;
}