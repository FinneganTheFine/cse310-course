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
		System.out.println("Welcome to Guess the Number");
		System.out.println("The number is between 1 and 100");
		//System.out.println(number);
		Scanner guess = new Scanner(System.in);
		System.out.println("Guess a number: ");
		while(playerGuess != number){
			playerGuess = guess.nextInt();
			if(playerGuess < number) {
				System.out.println("That's too low");
			}else if(playerGuess > number) {
				System.out.println("That's too high");
			}
		}
		guess.close();
		System.out.println(String.format("Congratulations!!! the number was %s", number));
	}

}
