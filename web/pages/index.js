import { ReactNode } from 'react';
import { Box, SimpleGrid, Heading, Text } from '@chakra-ui/react';
import Image from 'next/image';

import Speech from '../assets/speech.svg';
import Students from '../assets/students.svg';
import Clipboard from '../assets/clipboard.svg';
import House from '../assets/house.svg';
import Job from '../assets/job.svg';
import Professor from '../assets/professor.svg';

export default function index() {
	return (
		<>
			<SimpleGrid columns={2} spacing={10} mt="1%" pl="10%" pr="10%" mb="5%">
				<Box align="left" w="100%">
					<Heading color="blue.400" mb="1%">
						Welcome to Student Net.
					</Heading>
					<Text>
						Nunc aliquam enim at sapien aliquet, quis dignissim ipsum vulputate. Morbi
						ultrices leo id ligula imperdiet consequat. Vivamus ullamcorper hendrerit
						diam, vel aliquam dui vestibulum nec. Proin cursus efficitur pulvinar. Morbi
						quis est vehicula, accumsan tortor mollis, dictum erat. Donec posuere
						commodo lectus, pretium feugiat sapien vehicula vel. Donec a ligula rutrum,
						luctus urna id, tincidunt tellus.
					</Text>
				</Box>
				<Box align="center">
					<Image src={Students} />
				</Box>

				<Box align="center">
					<Image src={Speech} />
				</Box>
				<Box w="100%" pr="10%">
					<Heading color="blue.400" mb="1%">
						Forums
					</Heading>
					<Text>
						Quisque vehicula sem risus, et vehicula metus rutrum sollicitudin. Sed
						auctor semper semper. Duis vitae nibh eu eros mattis fringilla. Nullam sit
						amet odio sit amet erat lacinia lobortis. Sed vehicula turpis et ullamcorper
						ultricies. Vestibulum pretium ante bibendum magna rhoncus, sit amet euismod
						orci convallis. Donec id semper ex, quis vestibulum eros. Aenean elementum
						faucibus est, eget vehicula massa pulvinar at. Cras viverra quis magna in
						vehicula. Donec laoreet risus et tortor convallis, ac semper mi condimentum.
						Praesent viverra quis leo nec laoreet. Nunc risus odio, cursus non pulvinar
						volutpat, volutpat at quam.
					</Text>
				</Box>

				<Box>
					<Heading color="blue.400">Search for courses</Heading>
					<Text>
						Quisque id dictum quam. Maecenas rhoncus nisi nec pellentesque cursus. Proin
						fermentum urna sem, vel sagittis enim viverra ultricies. Maecenas eget felis
						quis risus mattis hendrerit. Morbi convallis diam eget tellus molestie
						commodo. Morbi imperdiet, ipsum ut suscipit facilisis, mauris ipsum tempus
						enim, sed auctor felis nisi et nulla. Fusce interdum eget nunc et mollis.
						Sed risus metus, pharetra sit amet urna nec, feugiat euismod nibh. Aliquam
						fringilla sem ut nulla semper, eu viverra diam fermentum. Curabitur ac
						accumsan ipsum, ac hendrerit purus. Phasellus fermentum dolor turpis, quis
						dictum lectus accumsan quis. Sed elementum tincidunt volutpat. Quisque
						mollis non libero eget luctus.
					</Text>
				</Box>
				<Box align="center">
					<Image src={Clipboard} />
				</Box>

				<Box align="center">
					<Image src={House} />
				</Box>

				<Box>
					<Heading color="blue.400">Housing</Heading>
					<Text>
						Fusce a lorem ac tellus vestibulum pellentesque. Ut eu diam libero. Sed id
						ipsum gravida, feugiat erat dignissim, rhoncus neque. Nulla facilisi. Aenean
						ac tempor metus, at tincidunt mauris. Nulla sit amet consectetur tellus, eu
						semper mi. Praesent ornare rutrum est porta tincidunt. Quisque suscipit arcu
						luctus risus mattis congue. Morbi et nunc laoreet, dignissim purus sed,
						vulputate sem. Orci varius natoque penatibus et magnis dis parturient
						montes, nascetur ridiculus mus. Quisque ullamcorper in nunc ut suscipit.
						Nullam viverra nec augue sed volutpat. Nulla ac dapibus augue, eget suscipit
						mi.
					</Text>
				</Box>

				<Box>
					<Heading color="blue.400">Looking for a job?</Heading>
					<Text>
						Sed nec lorem tempor, elementum ligula nec, fermentum ante. Proin ut erat
						turpis. Aenean ut quam id odio gravida rhoncus id et felis. Curabitur et
						cursus leo. In vel efficitur lorem, vitae ornare lacus. Nam eu elit magna.
						Nullam lacus urna, lacinia in varius vel, venenatis malesuada magna. Sed
						fringilla lectus eget quam suscipit, a hendrerit diam blandit.
					</Text>
				</Box>
				<Box align="center">
					<Image src={Job} />
				</Box>

				<Box align="center">
					<Image src={Professor} />
				</Box>

				<Box>
					<Heading color="blue.400">Review professors</Heading>
					<Text>
						Nunc aliquet, nulla nec rutrum finibus, felis dui lacinia justo, congue
						luctus diam mauris varius ante. Sed tincidunt, velit in pharetra mollis, mi
						tortor efficitur velit, et aliquam tellus ipsum ac purus. Sed eget sapien
						pretium lacus convallis congue. Maecenas dignissim scelerisque risus nec
						imperdiet. Donec tincidunt molestie ligula quis scelerisque. Donec porta
						velit vitae enim tempus, nec vestibulum augue dictum. Curabitur consequat,
						diam at venenatis volutpat, massa lorem sagittis magna, sed consequat dolor
						dui eu dolor.
					</Text>
				</Box>
			</SimpleGrid>
		</>
	);
}
