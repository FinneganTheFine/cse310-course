/**
 * 
 */

/**
 * @author Cole
 *
 */
import java.util.Scanner;

public class main {
	public static int number = (int)(Math.random()*100);
	public static int playerGuess = 0;
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		// This tells you that the game has begun
		System.out.println("Welcome to Guess the Number");
		System.out.println("The number is between 1 and 100");
		
		//System.out.println(number);
		
		//Scanner lets me get user input from the console.
		Scanner guess = new Scanner(System.in);
		
		System.out.println("Guess a number: ");
		//This while loop runs until the player guess correctly.
		
		while(playerGuess != number){
			
			playerGuess = guess.nextInt();
			
			if(playerGuess < number) {
				
				//If the players guess is lower than the number then it tells them
				System.out.println("That's too low");
				
			}else if(playerGuess > number) {
				
				//If the players guess is higher than the number then it tells them
				System.out.println("That's too high");
				
			}
		}
		
		//ends the session of Scanner so as not to waste memory
		guess.close();
		
		//Prints A congratulatory text to the terminal
		System.out.println(String.format("Congratulations!!! the number was %s", number));
	}

}
